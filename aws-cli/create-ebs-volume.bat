@echo off
SET INSTANCE_ID=i-0dc9c9f7b046eb15f
SET VOLUME_NAME=db-storage
SET VOLUME_SIZE=20
SET DEVICE_NAME=/dev/sdf

echo [1/4] Fetching Availability Zone for instance %INSTANCE_ID%...
for /f "tokens=*" %%a in ('aws ec2 describe-instances --instance-ids %INSTANCE_ID% --query "Reservations[0].Instances[0].Placement.AvailabilityZone" --output text') do set AZ=%%a

echo Detected AZ: %AZ%

echo [2/4] Creating %VOLUME_SIZE%GB gp3 volume in %AZ%...
for /f "tokens=*" %%b in ('aws ec2 create-volume --volume-type gp3 --size %VOLUME_SIZE% --availability-zone %AZ% --tag-specifications "ResourceType=volume,Tags=[{Key=Name,Value=%VOLUME_NAME%}]" --query "VolumeId" --output text') do set VOL_ID=%%b

echo Created Volume: %VOL_ID%

echo [3/4] Waiting for volume to become available...
aws ec2 wait volume-available --volume-ids %VOL_ID%

echo [4/4] Attaching volume %VOL_ID% to %INSTANCE_ID% as %DEVICE_NAME%...
aws ec2 attach-volume --volume-id %VOL_ID% --instance-id %INSTANCE_ID% --device %DEVICE_NAME%

echo.
echo SUCCESS! Volume %VOL_ID% is now attached.
echo Next: Log into the EC2 to format and mount the drive.
pause