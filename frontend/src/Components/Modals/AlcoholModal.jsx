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
            deleted: false,
            ordered: false,
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.delete = this.delete.bind(this);
        this.closeAfterDelete = this.closeAfterDelete.bind(this);
        this.order = this.order.bind(this);
        this.closeAfterOrder = this.closeAfterOrder.bind(this);
        this.renderEditDrink = this.renderEditDrink.bind(this); 
        this.renderModalContent = this.renderModalContent.bind(this);
        this.renderDrink = this.renderDrink.bind(this);
        this.renderDrinkDeleted = this.renderDrinkDeleted.bind(this);
        this.renderDrinkOrdered = this.renderDrinkOrdered.bind(this);
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

    closeAfterOrder(e){
        e.preventDefault();
        this.setState({deleted: false});
        this.props.toggleModal();
    }

    order(id){
        console.log("ordered");
        this.setState({ordered: true});
        /*deleteCocktail(id).then(response => {
            if(response.ok === 'ok') this.setState({order: true})
            }
        )
        */
    }

    renderEditDrink(){
        const {drink, admin} = this.props;
        return (
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
        );
    }

    renderDrink(){
        const {drink, isOrderable, admin, drinkUrl} = this.props;
        return(
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
                orderCocktail={this.order}
                isOrderable={isOrderable}
            />
        );
        
    }

    renderDrinkDeleted(){
            return(
            <div>
                <h3>Drink has been deleted successfully</h3>
                <button onClick={this.closeAfterDelete}>Close</button>
            </div>
            );
    }

    renderDrinkOrdered(){
        return(
            <div>
                <h3>Drink has been ordered. Payment to cover material cost will be requested via Vipps to the number you provided.</h3>
                <button onClick={this.closeAfterOrder}>Close</button>
            </div>
        )
    }

    renderModalContent(){
        const {isLoading, isOrderable} = this.props;
        if(isOrderable){
            if(this.state.ordered){
                return this.renderDrinkOrdered();
            }
            else {
                return this.renderDrink();
            }
        }else{
            if(this.state.deleted){
                return this.renderDrinkDeleted();
            }
            else{
                if(this.state.edit && !isLoading){
                    return this.renderEditDrink()
                }else{
                    return this.renderDrink();
                }
            }
        }
    }

    render() {
        const {isOpen, contentLabel, toggleModal} = this.props;
        return (
            <div>
                <ReactModal
                    isOpen={isOpen}
                    overlayClassName="modal"
                    className="modal-main"
                    contentLabel={contentLabel}
                    onRequestClose={toggleModal}
                    >
                    {this.renderModalContent()}
                </ReactModal>
            </div>
        );
    }
}

export default AlcoholModal;