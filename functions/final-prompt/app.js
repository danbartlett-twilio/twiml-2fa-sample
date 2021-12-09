const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.lambdaHandler = async (event, context) => {
    
    console.log("event is ==> ", event);

    let response;

    const vr = new VoiceResponse();

    const gather = vr.gather({                
        action: '/Prod/user-prompt?loopIndex=0',
        method: 'POST',
        input: 'dtmf',
        numDigits: 1,
        timeout:  5

    });
    gather.say({voice: 'Polly.Joanna'},'If you like to hear it again Press 1 otherwise hangup.');
    gather.say({voice: 'Polly.Joanna'},'See your computer screen for more options.');    

    vr.say({voice: 'Polly.Joanna'},'Goodbye');
    vr.hangup(); 

    console.log(vr.toString());
        
    response = {
        'statusCode': 200,
        headers: {
            'Content-Type': 'application/xml',
        },
        body: vr.toString()
        
    }    

    return response;
};
