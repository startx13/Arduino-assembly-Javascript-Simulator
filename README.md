# Arduino-assembly-Javascript-Simulator
Questo programma è un simulatore del microcontrollore di Arduino. Il programma è modulare poichè si possono aggiungere operazioni.

# Aggiunta Operazioni
Una operazione può essere aggiunta semplicemente modificando il file script/Processor.js
Per aggiungere una operazione bisogna scriverla sottoforma di funzione nella apposita sezione e i cui parametri sono un array di operandi e lo stato del processore. 

Ad esempio
```javascript
var addF = function(op,procStatus){...} 
```
è una scrittura valida.

Gli operandi sono un array con due indici quindi se nel codice abbiamo, ad esempio
```javascript
r0,r1
```
L'array sarà
```javascript
op[0] == "r0"
e
op[1] == "r1"
```

Dopo aver scritto la funzione questa va aggiunta alla lista delle operazioni disponibili scrivendo nell'apposita sezione

```javascript
this.operationList.addOperation("add",addF);
```
in cui "add" sarà il nome dell'operazione e addF la funzione appena creata
