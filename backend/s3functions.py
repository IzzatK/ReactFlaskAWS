import boto3
from flask import response

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

def send_sqs_message(message):
    sqs = boto3.client('sqs')
    queue_url = sqs.get_queue_url(QueueName='MyFlaskQueue')
    response = sqs.send_message(
    QueueUrl=queue_url,
    DelaySeconds=10,
    MessageAttributes={
        'Title': {
            'DataType': 'String',
            'StringValue': 'The Whistler'
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

print(response['MessageId'])

