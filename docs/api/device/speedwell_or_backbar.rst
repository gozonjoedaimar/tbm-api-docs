Speedwell/Backbar Scales API
============================

.. note::
	This documentation is a work in progress. We are continuously adding more information and updates. In the meantime, please feel free to browse the available links in our documentation.

Events (Lift/Place)
-------------------

Handles the transmission of device data, including information such as the current weight and RFID of bottles, to the system

Request schema/example
^^^^^^^^^^^^^^^^^^^^^^

.. code-block::

	PUT /api/device/place/<device_id>
	{
		"measured_weight": "1198",
		"rfid": "RD0104",
		"temperature": "",
		"batteryLevel": ""
	}

Example response
^^^^^^^^^^^^^^^^

.. code-block::

	{
		"status": true,
		"message": "Bottle Successfully transfered operation",
		"bottle": {
			"code": {
				"local": "100104",
				"rfid": "RD0104"
			},
			"weight": {
				"starting": 1250,
				"current": 1198,
				"empty": 544.98
			},
			"date": {
				"created": "2021-07-14T07:38:41.589Z",
				"in": "2021-07-14T07:38:41.589Z",
				"out": "2023-05-22T23:25:50.887Z",
				"update": "2023-05-22T23:25:50.887Z"
			},
			"cleanBottle": 0,
			"missing": 0,
			"cost": 0,
			"POcost": 0,
			"_id": "60ee94814xxxxx7d5abffb6a",
			"user": "585a44162cxxxxxb2d53aeb9",
			"location": "5d49128xxxxx582507ab9086",
			"brand": "5c5a983axxxxx43e26b40fdc",
			"bottle_id": "103",
			"volume": 750,
			"status": 1,
			"__v": 0,
			"loadCell": "b6xxxxx351"
		}
	}