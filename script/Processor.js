class Processor{

  var procStatus;
  var memory;

  Processor(program)
  {
    memory = new Memory(program);
    procStatus = new ProcessorStatus();
  }

  

}
