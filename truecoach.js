const fetch = require("node-fetch");

const opt = {
    "credentials": "include",
    "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "nb-NO,nb;q=0.9,no;q=0.8,nn;q=0.7,en-US;q=0.6,en;q=0.5",
        "authorization": "Bearer 57f65a8b1a726fb468dbaca676c743f9ac9124326af69144d382c3516cc3e7d2",
        "content-type": "application/json; charset=UTF-8",
        "role": "Client",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://ssonlinecoaching.truecoach.co/client/workouts/29281752/edit",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": {
        "workout_item": {
            "name": "Squat",
            "info": "3x5 @ 78",
            "result": "",
            "created_at": "2019-05-20T21:30:38.623Z",
            "linked": false,
            "position": 1,
            "is_circuit": false,
            "state": "completed",
            "selected_exercises": [],
            "attachments": [
                {
                    "name": "",
                    "attachmentUrl": "https://com-thefitbot-uploadcare-data.s3.amazonaws.com/03c87cb4-591f-40e0-b46f-f6d5b4c10741/1452.mp4",
                    "type": "video/mp4",
                    "size": 7835677
                },
                {
                    "name": "",
                    "attachmentUrl": "https://com-thefitbot-uploadcare-data.s3.amazonaws.com/bf3d932e-00fb-4d01-b5f6-143b74074e9a/squat.mov",
                    "type": "video/quicktime",
                    "size": 84197740
                }
            ],
            "workout_id": "29281752",
            "assessment_id": null,
            "exercise_id": "42113"
        }
    }, "method": "PUT",
    "mode": "cors"
}

fetch("https://ssonlinecoaching.truecoach.co/proxy/api/workout_items/129413836",
    opt).then(js => js.json()).then(r => {
        console.log(r)
    }).catch(e => {
        console.log('e', e)
    })