import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import React from "react";
import { Provider } from 'react-redux';
import { Baseline } from "../../components/atoms";
import { Store } from '../../store/index';
import BasePage from '../BasePage/BasePage';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ptBR } from 'date-fns/locale';

class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return this.format(date, "d MMM yyyy", { locale: this.locale });
    }
}

const App = (props) => {

    let theme = createMuiTheme({
        palette: {
            primary: {
                main: "#f63356",
            },
            secondary: {
                main: "#5f5f5f",
            },
            error: { light: "#e57373", main: "#f44336", dark: "#d32f2f" },
            warning: { light: "#ffb74d", main: "#ff9800", dark: "#f57c00" },
            info: { light: "#64b5f6", main: "#2196f3", dark: "#1976d2" },
            success: { light: "#81c784", main: "#4caf50", dark: "#388e3c" }
        },
    });
    theme = responsiveFontSizes(theme);

    axios.defaults.headers.post['Content-Type'] = 'application/json';

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#e0e0e0' }}>
            <ThemeProvider theme={theme}>
                <Baseline>
                    <Provider store={Store}>
                        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={ptBR}>
                            <BasePage />
                        </MuiPickersUtilsProvider>
                    </Provider>
                </Baseline>
            </ThemeProvider>
        </div>
    );
}

export default App