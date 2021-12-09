const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.lambdaHandler = async (event, context) => {
    
    console.log("event is ==> ", event);

    let response;

    let b = (event.body !== undefined) ? event.body : 'somekey=somevalue';

    console.log("b is ==> ", b);

    let bodyParams = JSON.parse('{"' + b.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    
    console.log("Digits are ==> ", bodyParams.Digits); // undefined if speech
    console.log("From is ==> ", bodyParams.From);

    let inputReceived = ((parseInt(bodyParams.Digits) === 1) ? true : false );

    console.log("inputReceived ==> ", inputReceived);

    const vr = new VoiceResponse();
    
    if (inputReceived) {
        
        // FORWARD TO VERIFICATION CODE
        vr.redirect({
            method: 'GET'
        }, '/Prod/verification-id');

    } else {

        // CHECK LOOP INDEX
        let passedIndex = parseInt(event.queryStringParameters.loopIndex);
        let loopIndex = ((passedIndex > 0) ? passedIndex : 0 );
        
        console.log("passed index => ", passedIndex);
        console.log("looped index => ", loopIndex);

        if (loopIndex < 3) {

            const gather = vr.gather({                
                method: 'POST',
                input: 'dtmf',
                numDigits: 1,
                timeout:  5

            });
            gather.say({voice: 'Polly.Joanna'},'If you are expecting a call, Press 1');
            
            vr.redirect({
                method: 'GET'
            }, '/Prod/user-prompt?loopIndex='+(loopIndex+1) );            
            

        } else {

            vr.say({voice: 'Polly.Joanna'},'Goodbye');
            vr.hangup(); 

        }

    }

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
