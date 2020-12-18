import {Tool} from 'substance'

class VotingTool extends Tool {
    render($$) {
        let el = $$('div').attr('title', this.getLabel('Infoga röstning'))

        el.append([
            $$('button').addClass('se-tool').append(
                $$('i').addClass('fa fa-comments')
            ).on('click', this.onClick.bind(this))
        ])

        return el
    }

    onClick() {
        // Execute a named command
        this.context.api.editorSession.executeCommand('voting.insert', {})
        //console.log("Hello!")
    }
}

export {VotingTool}