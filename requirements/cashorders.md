CashOrders
The complete workflow is an event based asynchronous process, triggered by a Scheduler. This trigger is the event that starts the generation of the Cash Order files for G4S’s Branch Master. The workflow is as follows:
1.	The workflow is triggered by a Scheduler  . This Scheduler runs every day (7 days a week) at 10:45 Europe/London time and automatically adjusts to the Daylight Saving Time and back when needed. The Scheduler resends the messages (retry) for a maximum of 3 times when an upload fails. This will be done within a time frame of 45 minutes, because after 11:30 Europe/London time, G4S cannot accept the orders any more. This is because of the cut off time that is set for this interface.
2.	If an error occurred and and the maximum number of retries has been reached, then an incident is loggend into the Incident Queue  .
3.	The Batch Processer reads the Cash Orders from the Batch Order database table that are stored there for G4S UK related orders  . The subscriber_event value of the records is g4s-uk-cash-order.
4.	Based on the selected Cash Orders and the XSD file, a an XML file is created by the Transform and Enrich Event Lambda  . For this process, the correct XSD is fetched from the JSON Schema and XSD Storage S3 Bucket and the results are temporary stored in the Temporary Batch Storage S3 Bucket. The name of the XSD file is bxh-int011-g4s-uk-cash-order-schema-1.0.0.xsd
5.	When the XML file is created, the file is uploaded to the archive folder within the BAC SFTP Server  . The location is /BAC/PRD/UK/G4S/BranchMaster/out/archive.
6.	After the file has been archived, the file will be uploaded to the G4S UK SFTP server  in the /orders directory.
7.	If the upload to G4S UK fails, then a retry will be executed for a maximum of 3 times.
8.	If the file could not be uploaded after three times, an incident is logged into the Incident Queue  .
9.	For every record that is added to the uploaded XML file, a call to the ODS must be made via the Service API of the ODS to update the status to SendToFullfillment  . For this a retry mechanism of three times is also in place.
10.	If for any reason an error occurs that the process cannot recover from, then an incident is logged into the Incident Queue  .
