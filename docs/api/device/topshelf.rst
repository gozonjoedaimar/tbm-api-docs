Topshelf API
============

Heartbeat
---------

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
            "r": String,
            "g": String,
            "b": String
        },
        "locate": 0 | 1, # If device location is on
        "message": String,
        "date": Date
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
            "r": "024",
            "g": "122",
            "b": "002"
        },
        "locate": 0,
        "message": "Device Online",
        "date": "05/22/23 10:41:47"
    }

Events (Lift/Place)
-------------------

This API enables you to send data to the server indicating whether the device is currently carrying a bottle or not.

Request schema
^^^^^^^^^^^^^^

.. code-block::

    PUT /api/topshelf/events
    {
        "deviceId": {
            type: String, # Encoded string
            required: true
        },
        "rfid": {
            type: String, # Bottle rfid or null
            required: true
        }
        "TimeStamp": Timestamp # Device timestamp (optional)
    }

Response schema
^^^^^^^^^^^^^^^

.. code-block::

    [
        {
            "status": Boolean,
            "event": {
                "datetime": Date,
                "flag": {
                    type: String
                    value: "Lift" | "Put"
                },
            }
        }
    ]

Sample cURL request
^^^^^^^^^^^^^^^^^^^

.. code-block::

    curl --location --request PUT '/api/topshelf/events' \
    --header 'Content-Type: application/json' \
    --data '{
        "deviceId": "4748s04xxxxx4047444039",
        "rfid": "RD0036", # or null for lift
        "TimeStamp": "1599550234396"
    }'

Sample cURL response
^^^^^^^^^^^^^^^^^^^^

.. code-block::

    [
        {
            "status": true,
            "event": {
                "datetime": "2023-05-22T15:16:56.325Z",
                "location_name": "The Gypsy Case",
                "flag": "Put"
            }
        }
    ]


Register
--------

This API allows you to send data to the server when the device is booted up.

Request schema
^^^^^^^^^^^^^^

.. code-block::

    POST /api/topshelf/register
    {
      "deviceId": {
          type: String,
          required: true
      }
    }


Response schema
^^^^^^^^^^^^^^^

.. code-block::

    {
        "status": Boolean,
        "message": String,
        "data": {
            "updated": Date,
        }
    }


Sample cURL request
^^^^^^^^^^^^^^^^^^^

.. code-block::

    curl --location '/api/topshelf/register' \
    --header 'Content-Type: application/json' \
    --data '{
      "deviceId": "4748s0xxxxx74047444039"
    }'


Sample cURl response
^^^^^^^^^^^^^^^^^^^^

.. code-block::

    {
        "status": true,
        "message": "Device successfully updated",
        "data": {
            "updated": "05/22/23 10:41:47",
        }
    }

