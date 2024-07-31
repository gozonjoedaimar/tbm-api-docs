Device Heartbeat API
====================

This API enables you to send device availability updates to the server and retrieve the current status of a device, including information such as colors and locating status.

Request schema
^^^^^^^^^^^^^^

.. code-block::

    PUT: /api/device/heartbeat
    {
        "deviceId": {
            type: String,
            required: true
        },
        "componentType": {
            type: String,
            value: "topshelf" | "speedwell" | "backbar",
            required: true
        }
    }

Response schema
^^^^^^^^^^^^^^^

.. code-block::

    {
        "color": {
            "r": "041", // 3 digit string
            "g": "104",
            "b": "220"
        },
        "locate": 0, // or 1 = Device locate active
        "decodedId": "89d7bf1851",
        "status": true,
        "message": "Device Online",
        "date": "MM/DD/YY HH:mm:ss",
        "incidents": []
    }

Sample cURL request
^^^^^^^^^^^^^^^^^^^

.. code-block::

    curl --location --request PUT '/api/device/heartbeat' \
    --header 'Content-Type: application/json' \
    --data '{
        "deviceId": "4748s04xxxxx4047444039",
        "componentType": "topshelf"
    }'

Sample cURL response
^^^^^^^^^^^^^^^^^^^^

.. code-block::

    {
        "color": {
            "r": "041",
            "g": "104",
            "b": "220"
        },
        "locate": 0,
        "decodedId": "89d7bf1851",
        "status": true,
        "message": "Device Online",
        "date": "09/22/23 18:46:06",
        "incidents": []
    }
