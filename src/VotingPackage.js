import './css/index.scss'
import {VotingTool} from './tools/VotingTool.js'
import {VotingCommand} from './commands/VotingCommand.js'
import {VotingNode} from './nodes/VotingNode.js'
import {VotingComponent} from './nodes/VotingComponent.js'
import {VotingConverter} from './VotingConverter.js'

export default {
    name: 'voting',
    id: 'ocl.lvlup.voting',
    // The configurator is called by the writer when it wants the
    // plugin to initalize itself and its different parts.
    configure: (configurator, pluginconfigurator) => {
        configurator.addContentMenuTopTool('voting.insert', VotingTool)
        configurator.addCommand('voting.insert', VotingCommand)
        configurator.addNode(VotingNode)
        configurator.addComponent(VotingNode.type, VotingComponent)
        configurator.addConverter(VotingConverter)
    }
}
