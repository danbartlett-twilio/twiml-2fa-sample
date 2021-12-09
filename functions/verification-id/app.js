const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.lambdaHandler = async (event, context) => {
    
    console.log("event is ==> ", event);

    let response;
    
    const vr = new VoiceResponse();
    
    let code = 674738;  // MAKE FUNCTION CALL OR PASS IN CODE

    let codeArray = code.toString().split('');

    try {

        let say = vr.say({
                voice: 'Polly.Joanna',
                loop: 2
            },
            'Your verification code is '
        );
        codeArray.forEach(function(digit) {
            say.break_({
                strength: 'x-weak',
                time: '100ms'
            });
            say.emphasis({
                level: 'moderate'
            }, digit);  

        });        

        say.break_({
            strength: 'x-weak',
            time: '200ms'
        });

        vr.redirect({
            method: 'GET'
        }, '/Prod/final-prompt');          
        
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
