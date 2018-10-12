import React, {Component} from 'react';
import ReactModal from 'react-modal';
import RandomDrinkCard from './RandomDrink';

ReactModal.setAppElement('#root')

class AlcoholModal extends Component {
    render() {
        const {isOpen, toggleModal, contentLabel, drink, drinkUrl} = this.props;
        return (
            <div>
                <ReactModal
                    isOpen={isOpen}
                    overlayClassName="modal"
                    className="modal-main"
                    contentLabel={contentLabel}
                    onRequestClose={(e) => toggleModal(e)}
                    >
                    <RandomDrinkCard
                      name={drink.name}
                      imageUrl={drinkUrl}
                      altUrl={drink.imageUrl}
                      description={drink.description}
                      glass={drink.glass}
                      ingredients={drink.ingredients}
                      amounts={drink.amounts}
                    >

                    </RandomDrinkCard>
                    <button onClick={(e) => toggleModal(e)}>Close Modal</button>
                </ReactModal>
            </div>
        );
    }
}

export default AlcoholModal;