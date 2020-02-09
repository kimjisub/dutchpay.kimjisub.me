import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Snackbar } from 'react-mdl'

import './MainPage.css'
import { firestore } from '../firebase'

class MainPage extends Component {
	constructor() {
		super()
		this.fs = firestore()
		this.state = {
			redirect: null,
			err: null
		}
	}

	render() {
		if (this.state.redirect) return <Redirect to={this.state.redirect} />

		return (
			<div>
				<Button
					raised
					ripple
					onClick={() => {
						this.fs
							.collection('DutchPay')
							.add({
								name: '',
								members: [],
								adminUid: '',
								timestamp: new Date()
							})
							.then(docRef => {
								this.setState({ redirect: `/${docRef.id}` })
							})
							.catch(err => {
								this.setState({ err: err })
							})
					}}>
					새로 만들기
				</Button>
				<Snackbar
					active={this.state.err != null}
					onClick={this.handleClickActionSnackbar}
					onTimeout={() => {
						this.setState({ err: null })
					}}
					action="Undo">
					{this.state.err}
				</Snackbar>
			</div>
		)
	}
}

export default MainPage