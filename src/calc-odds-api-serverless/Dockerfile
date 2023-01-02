FROM mcr.microsoft.com/azure-functions/node:4-node16
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true
COPY . /home/site/wwwroot
EXPOSE 7071
RUN cd /home/site/wwwroot && \
    npm install && \
    npm run build