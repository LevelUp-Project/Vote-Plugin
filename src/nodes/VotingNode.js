import {BlockNode} from 'writer'
class VotingNode extends BlockNode {}

VotingNode.define({
    type: 'x-my/voting',
    id: {type: 'string'},
    question: {type: 'string', optional: false, default: ''},
    answers: {type: 'array', optional: false},
    fields: {type: 'array' , optional: false}
})

export {VotingNode}