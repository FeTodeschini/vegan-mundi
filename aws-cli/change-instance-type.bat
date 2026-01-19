@echo off

set INSTANCE_ID=[instance-id]

echo Stopping EC2 instance %INSTANCE_ID%...
aws ec2 stop-instances --instance-ids %INSTANCE_ID%

echo Waiting for instance to stop...
aws ec2 wait instance-stopped --instance-ids %INSTANCE_ID%

echo Changing instance type from t2.micro to t3.micro...
aws ec2 modify-instance-attribute --instance-id %INSTANCE_ID% --instance-type "{\"Value\":\"t3.micro\"}"

REM modify-instance-attribute is a sync call that will only return a response once operation is completed, so there is no need to run a command for waiting for its execution
echo Instance type modified

echo Starting EC2 instance %INSTANCE_ID%...
aws ec2 start-instances --instance-ids %INSTANCE_ID%

echo Bringing instance up...
aws ec2 wait instance-running --instance-ids %INSTANCE_ID%

echo Done. EC2 instance is up and running

cmd /k