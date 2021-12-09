# twiml-2fa

This project use AWS SAM. 

Clone the repo, run sam init, sam build, sam deploy. That will deploy the lambdas and API Gateway. Point the voice handler to a Twilio the /welcome path and call the number!

The voice handler should go to /welcome first, and then conditionally progress to /user-prompt, then /verification-id, and finally /final-prompt.
