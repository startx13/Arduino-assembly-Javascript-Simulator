class Label
{
	constructor()
	{
		this.label = new Array(100);
		for (var i = 0; i < 100; i++ ) {
	    		this.label[i] = Array(2);
			this.label[i][0] = null;
		}
		
	}

	addLabel(lbName,lb)
	{	
		var done = false;
		for (var i = 0; i < 100 && !done; i++ ) {
	    		if(this.label[i][0] == null)
			{
				this.label[i][0] = lbName;
				this.label[i][1] = lb;
				done = true;
			}
		}
	}
	
	getLineFromLabel(lbName)
	{
		var t = false;
		for(var i = 0;i<100 && !t;i++)
		{
			if(this.label[i][0] == lbName)
			{
				t = true;
				return	this.label[i][1];
			}
		}

		if(!t)
		{
			console.log("non trovato");
		}
	}
}
