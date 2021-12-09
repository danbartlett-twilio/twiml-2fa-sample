const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.lambdaHandler = async (event, context) => {
    
    console.log("event is ==> ", event);

    let response;

    const vr = new VoiceResponse();
    
    try {
    
        vr.say({voice: 'Polly.Joanna'},'Hello, this is the call from the Verification and Identity Protection Service.');
        vr.redirect({
            method: 'POST'
        }, '/Prod/user-prompt?loopIndex=0');        

        console.log(vr.toString());
        
        response = {
            'statusCode': 200,
            headers: {
                'Content-Type': 'application/xml',
            },
            body: vr.toString()
            
        }    
                
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};
