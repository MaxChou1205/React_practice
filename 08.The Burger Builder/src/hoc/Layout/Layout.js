import React, { Component } from 'react';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';

class layout extends Component
{
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () =>
    {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () =>
    {
        this.setState((prevState) =>
        {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render()
    {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDraw
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default layout;