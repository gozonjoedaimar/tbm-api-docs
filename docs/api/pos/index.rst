Micros/Aloha:
=============

Registration
------------

Handles the transmission of data to the API and facilitates the retrieval of an API key during device bootup

Request schema
^^^^^^^^^^^^^^

.. code-block::

	POST /api/pos/ 
	{
		device_id: {
			type: String, # device id is Mac Address
			required: true
		}, 
		type: {
			type: String, # 1 = Micros, 2 = Aloha
			required: true,
		}
	} 

Response schema
^^^^^^^^^^^^^^^

.. code-block::

	{
		status:true, # Boolean
		message:”POS successfully registered.”, # String
		key: (API KEY)
	} 
