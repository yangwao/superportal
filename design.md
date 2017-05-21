### mechanics

* mater will generate temporary token tied with member-uuid on backend
* member will recieve generated URL w/ short-lived/temporary token & member-uuid & device-uuid by master (i.e. Admin)
* member will open link via modern browser & generate own fingerprint/set pre-generated device-uuid
* **magic happens**
* meanwhile on backend it will exchange temporary token for new generated long-lived token
* long-lived token will be stored on member's modern browser
* member is ready with authenticated modern device to access content

user 	
	{ 	
	member: uuid.v4(),
	tmpToken: uuid.v4(),
	appId: uuid.v4(),
	fp: fingerprint2
	}
