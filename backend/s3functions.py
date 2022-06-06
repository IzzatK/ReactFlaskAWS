import boto3
from flask import Response

def upload_file(file_name, bucket):
    object_name = file_name
    s3_client = boto3.client('s3')
    response = s3_client.upload_file(file_name, bucket, object_name)
    return response

def show_image(bucket):
    s3_client = boto3.client('s3')
    public_urls = []
    try:
        for item in s3_client.list_objects(Bucket=bucket)['Contents']:
            presigned_url = s3_client.generate_presigned_url('get_object', Params = {'Bucket': bucket, 'Key': item['Key']}, ExpiresIn = 100)
            public_urls.append(presigned_url)
    except Exception as e:
        pass
    return public_urls

def connect_sqs(service_name):
    sqs_client = boto3.client('sqs')
    return sqs_client
    # import boto3

# Create SQS client
# sqs = boto3.client('sqs') #add access key and secret key  of SQS User Owner here for KM App

# Get URL for SQS queue
# response = sqs.get_queue_url(QueueName='MyFlaskQueue')

# print(response['QueueUrl'])

def send_sqs_message(message, username):
    sqs = boto3.client('sqs')
    queue_url = sqs.get_queue_url(QueueName='MyFlaskQueue')
    queue_urltwo = queue_url['QueueUrl']
    
    response = sqs.send_message(
    QueueUrl=queue_urltwo,
    DelaySeconds=10,
    MessageAttributes={
        'Title': {
            'DataType': 'String',
            'StringValue': 'Exception Handler SQS message'
        },
        'username': {
            'DataType': 'String',
            'StringValue': username
        },
        'Author': {
            'DataType': 'String',
            'StringValue': 'John Grisham'
        },
        'WeeksOn': {
            'DataType': 'Number',
            'StringValue': '6'
        }
    },
    MessageBody=(
        message
    )
)

    print(message, username)
    print('response is ---------->', response)

def get_sqs_message():
    sqs = boto3.client('sqs')
    queue_url = sqs.get_queue_url(QueueName='MyFlaskQueue')
    messagesarr = []
    queue_urltwo = queue_url['QueueUrl']
    i = 0
    response = sqs.receive_message(
    QueueUrl=queue_urltwo,
    AttributeNames=[
        'All'
    ],
    MessageAttributeNames=[
        'string', 'username'
    ],
    WaitTimeSeconds=20,
    VisibilityTimeout=0,
    MaxNumberOfMessages=10,
    # VisibilityTimeout=100,
    # WaitTimeSeconds=5,
    # ReceiveRequestAttemptId='string'
)

    message = response['Messages'][0]
    for messageshere in response['Messages']:
        messagetwo = response['Messages'][i]
        print('Messages ith index ----------->',i,  messageshere)
        #probably should just store these msgs into an array then destrucutre the attributes w/ FrontEnd React logic
        # messagesarr[i] = messageshere.Attributes.MessageAttributes
        print('Messages attribute is ----------->',  messageshere.get('MessageAttributes'))
        i+=1
    # print('10th message is -------->', response['Messages'][1])
    # print('response msg attributes is ----------->', response.Messages[i].MessageAttributes)
    # print('response message is -------------->', message)

    # try:
    #      messages = response['Messages']
    # except KeyError:
    #      print('No messages on the queue!')
    #      messages = []

    
    # print('response ----------->', response)

    # print('response is -----------> messages try block here', messages)

    

def get_all_sqs_msgs():
    sqs_client = boto3.client('sqs')
    queue_url = sqs_client.get_queue_url(QueueName='MyFlaskQueue')
    messagesarr = []
    queue_urltwo = queue_url['QueueUrl']
    while True:
        resp = sqs_client.receive_message(
            QueueUrl=queue_urltwo,
            AttributeNames=['All'],
            MaxNumberOfMessages=10
        )

        try:
            yield from resp['Messages']
        except KeyError:
            return

        entries = [
            {'Id': msg['MessageId'], 'ReceiptHandle': msg['ReceiptHandle']}
            for msg in resp['Messages']
        ]

        resp = sqs_client.delete_message_batch(
            QueueUrl=queue_urltwo, Entries=entries
        )

        if len(resp['Successful']) != len(entries):
            raise RuntimeError(
                f"Failed to delete messages: entries={entries!r} resp={resp!r}"
            )

