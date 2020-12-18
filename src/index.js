import VotingPackage from './VotingPackage'
import {registerPlugin} from 'writer'

(() => {
    // Register the plugin with the Writer when registerPlugin() is available
    if (registerPlugin) {
        registerPlugin(VotingPackage)
    } else {
        console.error('Register method not yet available')
    }
})()
