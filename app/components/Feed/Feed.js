import React, { PropTypes } from 'react'
import { AddAppContainer, AppContainer } from 'containers'
import { Grid, GridItem } from 'components'
import { List } from 'immutable'
import { newAppContainer, header } from './styles.css'
import { errorMsg } from 'shared/styles.css'

const {
    string,
    func,
    bool
} = PropTypes

/**
 * NewAppsAvailable() returns a message component
 * letting the user know whether new apps have been
 * created by other users
 */
NewAppsAvailable.propTypes = {
    handleClick: func.isRequired
}

function NewAppsAvailable ({ handleClick }) {
    return (
        <div className={newAppContainer} onClick={handleClick}>
            {'New Apps Have Been Created'}
        </div>
    )
}

/**
 * Feed() displays the app feed listing all apps
 * created.
 */
Feed.propTypes = {
    appIds: PropTypes.instanceOf(List),
    error: string.isRequired,
    isFetching: bool.isRequired,
    newAppsAvailable: bool.isRequired,
    resetNewAppsAvailable: func.isRequired
}

function Feed (props) {
    return (

        props.isFetching === true
            ?   <h1 className={header}>{'Fetching'}</h1>
            :   <Grid>
                    {props.newAppsAvailable ? <NewAppsAvailable handleClick={props.resetNewAppsAvailable} /> : null}
                    <GridItem>
                        <AddAppContainer />
                    </GridItem>
                    {
                        //  immutable uses .size instead of .length
                        props.appIds.size === 0
                            ? <p className={header}>{'This is unfortunate.'} <br /> {'It appears there are no apps yet'}</p>
                            : null
                    }
                    {
                        // immutable has a .map property also
                        props.appIds.map( (id) => (
                            <GridItem key={id}>
                                <AppContainer appId={id} />
                            </GridItem>
                        ))
                    }
                    {props.error ? <p className={errorMsg}>{props.error}</p> : null}
                </Grid>
    )
}

export default Feed
