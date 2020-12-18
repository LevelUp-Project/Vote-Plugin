const VotingConverter = {
    type: 'x-my/voting',
    tagName: 'object',
    matchElement: function(el) {
        
        //console.log("TEST" + el.is('object[type="x-my/voting"]'))
        
        return el.is('object[type="x-my/voting"]')
    },

    import: function(el, node) {
        
        node.id = el.attr('id')
        node.question = el.attr('question')
        node.answers = JSON.parse(el.attr('answers'))
        node.fields = JSON.parse(el.attr('fields'))
    },

    export: function(node, el, converter) {
        const $$ = converter.$$
        
        el.attr({
            id: node.id,
            type: 'x-my/voting',
            question: node.question,
            answers: JSON.stringify(node.answers),
            fields: JSON.stringify(node.fields)
        })
    }
}

export {VotingConverter}