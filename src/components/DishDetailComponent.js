import React,{Component} from 'react';
    import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle,Modal,ModalHeader,ModalBody,Button,Row,Col,Label } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Control,LocalForm,Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent';
function RenderDish({dish})
{
    if (dish == null) return (<div></div>);

        return (
        <Card>  
                 <CardImg  src={dish.image} alt={dish.name}/>

            <CardBody>  
                <CardTitle> {dish.name} </CardTitle>
                <CardText> {dish.description} </CardText>
             </CardBody>
       
        </Card>


        );

    }

    function RenderComments({comments, addComment , dishId})

    {   
        var list = comments.map(comment => {
            if (comments!=null)

            return( 
                <li key = {comment.id}>
                {comment.comment},
                 <br/>
                 <br/>
                 {comment.author}
            <br/>
            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
            <br/>
                </li>

            );


        });
        return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                        {list}
        </ul>
            <CommentForm dishId={dishId} addComment={addComment}/>

        </div>
        );
    }


    const DishDetail = (props) => {
        if (props.isLoading){

            return (

                <div className="container">
                    <div className="row">
                        <Loading/>

                    </div>
                </div>

            );
 }
 else if (props.errMess){

  return (

                <div className="container">
                    <div className="row">
                       <h4>{props.errMess}</h4>

                    </div>
                </div>

            );



 }
        if (props.dish) {
            return (
                 <div className="container">
                    <div className="row">
                        <Breadcrumb>

                             <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                             <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                         </Breadcrumb>
                 <div className="col-12">
                     <h3>{props.dish.name}</h3>
                    <hr />
                    </div>                
                    </div>
            <div className="row">
                 <div className="col-12 col-md-5 m-1">
                     <RenderDish dish={props.dish} />
              </div>
                     <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} 
                addComment={props.addComment}
                dishId={props.dish.id}
            />
            </div>
            </div>
            </div>
            

            );
        }
        else {
            return (
            <div></div>
            );
        }
    } 

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component 
    {

        constructor (props)
        {

            super(props);

            this.state = 
            {
                isModalOpen: false
            };

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }


        toggleModal() {
            this.setState({ isModalOpen: !this.state.isModalOpen });
        }


        handleSubmit(values){
              this.toggleModal();
                
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);


        }

        render()
        {
            return (
            <div>
                <Button  outline onClick={this.toggleModal} > 
                   <span className="fa fa-pencil fa-lg"> Submit Comment </span>   
                 </Button>


            <div className="row row-content">
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
                        <ModalBody> 
                            <div className="col-12 col-md-9">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} >

            <Row className="form-group">
                 <Label htmlFor='rating'> Rating </Label>
                 <Col md={10}>
                     <Control.select model=".rating" name="rating" className="form-control" >
                         <option>1</option>
                         <option>2</option>
                        <option>3</option>
                         <option>4</option>
                         <option>5</option>
                      </Control.select>
                 </Col>
            </Row>
            
            <Row className="form-group">
                 <Label htmlFor="author"> Name</Label>
                 <Col md={10}>
                         <Control.text model=".author" id="author" name="author" placeholder="Your Name" 
                             className="form-control"
                             validators={{ required,
                           minLength:  minLength(3), 
                              maxLength: maxLength(15)}} />

              <Errors className="text-danger" model=".name" show="touched" 
                     messages={{ required: 'Required', 
                     minLength: 'Must be greater than 3 characters', 
                     maxLength: 'Must be 15 charaters or less'}} />
                 </Col>
              </Row>


              <Row className="form-group">
                        <Label htmlFor="comment" md={3}>Your Feedback</Label>
                        <Col md={9 }>
                          <Control.textarea model=".comment" id="comment" name="comment" rows="4" 
                          className="form-control" validators={{ required }} />
                          <Errors className="text-danger" model=".comment" show="touched" 
                           messages={{ required: 'Required'}} />
                         </Col>
              </Row>

                         <Button type="submit" value="submit" color="primary">Submit</Button>  
              </LocalForm>
              </div>
              </ModalBody>    
              </Modal>
              </div>
              </div>


              );
          }
      }



      export default DishDetail; 



