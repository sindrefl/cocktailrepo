import React, {Component} from 'react';
import ReactModal from 'react-modal';
import RandomDrinkCard from '../Cards/RandomDrink';
import EditableDrink from '../Cards/EditableDrink';
import { deleteCocktail } from '../../Containers/api';

ReactModal.setAppElement('#root')

class AlcoholModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit: false,
            deleted: false
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.delete = this.delete.bind(this);
        this.closeAfterDelete = this.closeAfterDelete.bind(this);
    }

    toggleEdit = () => {
        this.setState(prevstate => ({edit: !prevstate.edit}))
    }

    closeAfterDelete(e){
        e.preventDefault();
        this.setState({deleted: false});
        this.props.toggleModal();
    }

    delete(id){
        deleteCocktail(id).then(response => {
            console.log(response)
            if(response.ok === 'ok') this.setState({deleted: true})
            }
        )
    }

    render() {
        const {isOpen, toggleModal, contentLabel, drink, drinkUrl, admin, isLoading} = this.props;
        console.log(isLoading)
        return (
            <div>
                <ReactModal
                    isOpen={isOpen}
                    overlayClassName="modal"
                    className="modal-main"
                    contentLabel={contentLabel}
                    onRequestClose={toggleModal}
                    >
                    {!this.state.deleted ? 
                        <div>
                            {this.state.edit && !isLoading ? 
                            <EditableDrink
                                drinkId={drink.cocktail_id}
                                name={drink.name}
                                description={drink.description}
                                glass={drink.glass}
                                ingredients={drink.ingredients}
                                amounts={drink.amounts}
                                recipe={drink.recipe}
                                admin={admin}
                                toggleEdit={this.toggleEdit}
                            />
                            : 
                            <RandomDrinkCard
                                drinkId={drink.cocktail_id}
                                name={drink.name}
                                imageUrl={drinkUrl}
                                altUrl={drink.imageUrl}
                                description={drink.description}
                                glass={drink.glass}
                                ingredients={drink.ingredients}
                                amounts={drink.amounts}
                                recipe={drink.recipe}
                                admin={admin}
                                toggleEdit={this.toggleEdit}
                                deleteCocktail={this.delete}
                            />
                            }
                        </div>
                        :
                        <div>
                            <h3>Drink has been deleted successfully</h3>
                            <button onClick={this.closeAfterDelete}>Close</button>
                        </div>
                        }
                    
                </ReactModal>
            </div>
        );
    }
}

export default AlcoholModal;