import {Component} from 'substance'
import {api} from 'writer'
//import {UIButton, UIToggle} from 'writer'
import {UIIconButton} from 'writer'
import {UIInputText} from 'writer'
class VotingComponent extends Component {
    
    getInitialState() {
        
        // The InitialState of the variables used by the writer plugin
        return {
            answers: this.props.node.answers,
            fields: this.props.node.fields,
        }
    }
    
    render($$) {
        
        const el = $$('div').addClass('dw-blocknode dw-blocknode--gray dw-blocknode--focus-transparent') // Div that will hold all the graphical elements.
        
        const QuestionInput = $$(UIInputText, { // 
            id: 'LVLUP',
            type: 'primary',
            icon: 'fa fa-comments',
            placeholder: 'Fråga',
            value: this.props.node.question,
            onChange: (value) => {   
                this.props.node.question = value; 
            }
        })

        const AddAnswerButton = $$(UIIconButton, { // 
            id: 'AAB',
            label: this.getLabel('Nytt svar'),
            icon: 'fas fa-plus-circle',
            size: 'normal',
            onClick: () => {
                let index = this.state.fields.length;
                    
                this.setState({ 
                    fields: [...this.state.fields,index],
                    answers: [...this.state.answers,""]
                })
                
                this.props.node.answers = this.state.answers; 

                api.editorSession.transaction((tx) => {                
                    tx.set([this.props.node.id, 'answers'], this.state.answers);
                    tx.set([this.props.node.id, 'fields'], this.state.fields);
                })    
                this.rerender()                
            }
        })

        // Where all the different Buttons and elements are added to the Div
        el.append([
            
            $$('div').addClass('dw-blocknode__header').append([
                $$('i').addClass('fa fa-comments'),
                $$('p').append(this.getLabel('Röstning')),
            ]),
			
            $$('div').addClass('').append([
			
                $$('div').addClass('LVLUPCONTAINER').append([
                    $$('i').addClass('LVLUPICON').addClass('fa fa-pencil'),
                    $$('div').addClass('LVLUPINPUTANSWER').append(QuestionInput),
                ]),
				
                $$('div').append(this.state.fields.map(f => this._renderField($$,f))),
				
                $$('div').addClass('LVLUPCONTAINER').append([
                    $$('div').addClass('LVLUPADDINPUT').append(AddAnswerButton),
                    //$$('p').addClass('LVLUPADDINPUT').append(this.getLabel('Nytt svar')),
                ]),
               
            ]),
            
        ])

        return el
    }
    
    _renderField($$, field) {

        const AnswerInput = $$(UIInputText, { // 
            id: 'AI'+field,
            type: 'primary',
            placeholder: 'Svar',
            label: this.getLabel(''),
            value: this.props.node.answers[field],
            onChange: (value) => {
                            
                this.state.answers[field] = value;               
                this.props.node.answers = this.state.answers; 
            }
        })
        
        const RemoveAnswerButton = $$(UIIconButton, { // 
            id: 'RAB'+field,
            label: this.getLabel(' '),
            icon: 'fas fa-minus-circle',
            size: 'normal',
        }).on('click', () => {            
            this.state.answers.splice(field,1);
            this.state.fields.splice(field,1);
            
            for (let i = 0; i < this.state.fields.length; i++) {
                this.state.fields[i] = i;
            }
            
            this.setState({
    
                answers: this.state.answers,
                fields: this.state.fields

            })
            
            api.editorSession.transaction((tx) => {
                tx.set([this.props.node.id, 'answers'], this.state.answers);
                tx.set([this.props.node.id, 'fields'], this.state.fields);
            })
            this.rerender()
        })
        
        const MyField = $$('div').addClass('LVLUPCONTAINER').append([
            $$('i').addClass('LVLUPICON').addClass('fa fa-comments'),
            $$('div').addClass('LVLUPINPUT').append(AnswerInput),
            $$('div').addClass('LVLUPREMOVEINPUT').append(RemoveAnswerButton),
        ])
        MyField.id = "Answer"+field
        return MyField;
    }
    
}

export {VotingComponent}