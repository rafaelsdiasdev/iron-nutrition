import React, { Component } from 'react';
import { Modal } from './Modal'

class AddFood extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            calories: '',
            modalState: false

        }
        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal() {
        this.setState((prev, props) => {
            const newState = !prev.modalState;

            return { modalState: newState };
        });
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        if (this.state.name && this.state.calories && this.state.image !== '') {
            this.toggleModal()
            this.props.addTheFood(this.state);
            this.setState({
                name: '',
                calories: '',
                image: '',
            })
        }
    }

    handleChange(event) {
        let { name, value } = event.target;
        // console.log('==>',this.state.name)
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        <div className="has-text-centered content">
                            <a className="button is-primary" onClick={this.toggleModal}>Add Food</a>
                        </div>
                        <Modal
                            addTheFood={this.addFoodHandler}
                            closeModal={this.toggleModal}
                            modalState={this.state.modalState}
                            title="Add a new food">
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="field">
                                    <label className="label">Name:</label>
                                    <div className="control">
                                        <input className="input" type="text" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Calories:</label>
                                    <div className="control">
                                        <input className="input" type="text" name="calories" value={this.state.calories} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Image:</label>
                                    <div className="control">
                                        <input className="input" type="text" name="image" value={this.state.image} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="control">
                                    <input className="button is-primary" type="submit" value="Submit" />
                                </div>
                            </form>
                        </Modal>
                    </div>
                </section>
            </div>
        )
    }
}

export default AddFood;