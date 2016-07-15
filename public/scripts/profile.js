var Profile = React.createClass({
    loadUserFromServer: function () {
        $.ajax({
            url: "http://localhost:8882/api/getUserInfo",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleSubmit: function (Data) {
        Data.preventDefault();
        var info = this.state.data;
        info.id = Date.now();
        var newInfo = {
            "name": this.refs.name.value,
            "email": this.refs.email.value,
            "company": this.refs.company.value,
            "number": this.refs.number.value,
        };
        this.setState({data: newInfo});
        $.ajax({
            url: "http://localhost:8882/api/submitUserInfo",
            type: 'POST',
            data: newInfo,
            success: function (data) {
                alert(data);
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({data: info});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    deleteInfo: function (Data) {
        Data.preventDefault();
        $.ajax({
            url: "http://localhost:8882/api/deleteUserInfo",
            type: 'DELETE',
            data: "",
            success: function (data) {
                alert(data);
                this.refs.name.value = "";
                this.refs.name.email = "";
                this.refs.name.company = "";
                this.refs.name.number = "";
                this.setState.data = null;

            }.bind(this),
            error: function (xhr, status, err) {
//                this.setState({data: info});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    UpdateInfo: function (Data) {
        Data.preventDefault();
        var newInfo = {
            name: this.refs.name.value,
            email: this.refs.email.value,
            company: this.refs.company.value,
            number: this.refs.number.value,
        }
        $.ajax({
            url: "http://localhost:8882/api/userUpdate",
            type: 'PUT',
            data: newInfo,
            success: function (data) {
                alert(data);

            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({data: info});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: []};
    },
    handleChange: function (e) {
        this.setState({value: e.target.value});
    },
    componentDidMount: function () {
        this.loadUserFromServer();
//    setInterval(this.loadUserFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
                < form className = "profileForm" onSubmit = {this.handleSubmit} method = "POST" >
                < div className = "form-group" >
                < label htmlFor = "name" > Your Name < /label><br/ >
                < input type = "text" name = "name" ref = "name" placeholder = "Your name" value = {this.state.name} onChange = {this.handleChange} / >
                < /div>
                < div className = "form-group" >
                < label htmlFor = "email" > Email < /label><br/ >
                < input type = "email" ref = "email" name = "email" placeholder = "Email" value = {this.state.email} onChange = {this.handleChange}
        />
                < /div>
                < div className = "form-group" >
                < label htmlFor = "company" > Company Name < /label><br/ >
                < input type = "text" name = "company" ref = "company" placeholder = "Company Name" value = {this.state.company} onChange = {this.handleChange}
        />
                < /div>
                < div className = "form-group" >
                < label htmlFor = "number" > Your Number < /label><br/ >
                < input type = "phone" ref = "number" name = "number" placeholder = "Your Number" value = {this.state.number} onChange = {this.handleChange} / >
                < /div>
                < div className = "form-group" >
                < input type = "submit" value = "Post" / >
                < button onClick = {this.deleteInfo} > Delete Info < /button>
                < button onClick = {this.UpdateInfo} > Update Info < /button>
                < /div>
                < /form>
                );
    }
});

ReactDOM.render(
        < Profile / > ,
        document.getElementById('content')
);
