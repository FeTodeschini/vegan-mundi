@echo off

echo SSHing to the Docker EC2 instance...
ssh -i [pem-folder]/[key.pem] [instance-user]@[instance--ip]
cmd /k