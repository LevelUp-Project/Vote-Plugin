import {WriterCommand, idGenerator} from 'writer'

class VotingCommand extends WriterCommand {
    execute(params) {
        params.editorSession.transaction(tx => {			
            // Perform actions in a transaction that become
            // part of the undo/redo history
            tx.insertBlockNode({
                id: idGenerator(),
                type: 'x-my/voting',
                question: "",
                answers: ["",""],
                fields: [0,1]
            })
        })
        return true
    }
}

export {VotingCommand}