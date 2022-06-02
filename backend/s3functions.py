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
    queue_urltwo = queue_url['QueueUrl']
    response = sqs.receive_message(
    QueueUrl=queue_urltwo,
    AttributeNames=[
        'All'
    ],
    MessageAttributeNames=[
        'string', 'username'
    ],
    MaxNumberOfMessages=10,
    VisibilityTimeout=100,
    WaitTimeSeconds=5,
    ReceiveRequestAttemptId='string'
)
    print('response is ----------->', response.Messages[0].MessageAttributes)
    print('response is ----------->', response)

    return()

