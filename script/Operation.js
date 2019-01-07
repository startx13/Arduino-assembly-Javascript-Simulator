class Operation
{
	constructor()
	{
		this.operation = new Array(100);
		for (var i = 0; i < 100; i++ ) {
	    		this.operation[i] = Array(2);
			this.operation[i][0] = null;
		}
		
	}

	addOperation(opName,op)
	{	
		var done = false;
		for (var i = 0; i < 100 && !done; i++ ) {
	    		if(this.operation[i][0] == null)
			{
				this.operation[i][0] = opName;
				this.operation[i][1] = op;
				done = true;
			}
		}
	}
	
	exec(instr,op,procStatus)
	{
		var t = false;
		for(var i = 0;i<100 && !t;i++)
		{
			if(this.operation[i][0] == instr)
			{
				this.operation[i][1](op,procStatus);
				t = true;
			}
		}
		if(!t)
		{
			console.log("non trovato");
		}
	}
}
