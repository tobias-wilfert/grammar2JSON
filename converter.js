function converter(str) {
    // The Object to return
    let obj = {
      Variables: [],
      Terminals: [],
      Productions: [],
      Start: ""
    };

    const terminals = new Set();
    const variables = new Set();

    for(let line of str.split('\n')){

        let head = "";
        let bodies = [[]];

        for(let word of line.split(' ')){
            if(head === "" && word !== ""){
                // If it is the first variable it becomes the start symbol
                if(obj.Start === ""){ obj.Start = word;}
                head = word;
                variables.add(word);
                terminals.delete(word);
            }else if(!["->", "|", "''",""].includes(word)){
                bodies[bodies.length - 1].push(word);
                if(!variables.has(word)){ terminals.add(word);}
            }else if(word === "|"){
                bodies.push([]);
            }
        }

        if(head !== ""){ // Done so that a trailing empty line is ignored
            for(let body of bodies){
                obj.Productions.push({ head: head, body: body});
            }
        }
    }
    obj.Variables = Array.from(variables);
    obj.Terminals = Array.from(terminals);

    document.getElementById('output').value = JSON.stringify(obj, null, 2);
};
