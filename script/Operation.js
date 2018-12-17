class Operation
{
	constructor()
	{
		this.operation = new Array(100);
		for (var i = 0; i < 100; i++ ) {
	    		this.operation[i] = Array(2);
		}
		
	}

	addOperation(opName,op)
	{
		for (var i = 0; i < 100; i++ ) {
	    	if(this.operation[i][0] == null)
			{
				this.operation[i][0] = opName;
				this.operation[i][1] = op;
			}
		}
	}
	
	exec(instr,op,procStatus)
	{
		for(var i = 0;i<100;i++)
		{
			if(this.operation[i][0] == instr)
			{
					this.operation[i][1](op,procStatus);
			}
		}
	}
}
