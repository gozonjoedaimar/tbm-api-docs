Order API
=========

Handles transmission of Point of Sale (POS) order data to the server

Request schema
^^^^^^^^^^^^^^

.. code-block::

	PUT /api/order/<API Key>
	{
		order_id: String, 		# Transaction ID 
		check_no: String, 		# optional 
		employee_id: String,		 # POS Employee ID 
		pos_type: Number,		# 1 = Micros, 2 = Aloha  
		item: [{				# Array of items 
			item_id: String,	# POS Item ID 
			item_name: String,	# POS Item Name 
			qty: Number,
			price: Number, 
			category: String,	# POS Category name of Item 
			date: Date, 		# Date and Time the item added to the order 	
		}],
		date: Date,			# Date and Time the order has been added to the POS 
	}

Example request
^^^^^^^^^^^^^^^

.. code-block::

	{
		order_id: 1048582,
		check_no: 10006,
		employee_id: 1865,
		pos_type: 2,
		item: [
			{
				item_id: 10325,
				item_name: “SALIOR JERRY”,
				qty: 1,
				price: 7,
				category: “LIQUOR”
				date: 2012-01-19 19:31:11,
			},
			{
				item_id: 10440,
				item_name: “CROWN ROYAL”,
				qty: 1,
				price: 7,
				category: “LIQUOR”
				date: 2012-01-19 19:31:16,
			},
			{
				item_id: 15025,
				item_name: “CORONA”,
				qty: 1,
				price: 4,
				category: “LIQUOR”
				date: 2012-01-19 19:31:24,
			}
		],
		date: 2012-01-19 19:31:42,
	}
