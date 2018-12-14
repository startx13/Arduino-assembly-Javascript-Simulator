class Operation
{
	constructor()
	{
		for (var i = 0; i < 100; i++ ) {
	    		this.operation[i][0] = null;
					this.operation[i][1] = null;
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
	exec(instr,op)
	{
		for(var i = 0;i<100;i++)
		{
			if(this.operation[i][0] == intst)
			{
					this.operation[i][1](instr,op);
			}
		}
	}
}
