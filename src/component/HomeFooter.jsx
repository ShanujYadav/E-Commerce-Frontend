import { Col, Container, Row } from "react-bootstrap"

const HomeFooter=()=>{
    return <div style={{backgroundColor:'black'}}>
        <Container>
            <Row>
            <p style={{marginTop:'70px',fontWeight:'bold',color:"white"}}>Questions?  Call  <u>0202-7289-3278-2578</u></p>
            </Row>
            <Row style={{marginTop:'70px',fontWeight:'bold',color:"white"}}>
             <Col>
             <ul>
                <li>
                    <u>FAQ</u>
                </li>
                <li>
                    <u>Account</u>
                </li>
                <li>
                    <u>Jobs</u>
                </li>
                <li>
                    <u>Privacy</u>
                </li>
                <li>
                    <u>Contact Us</u>
                </li>
                <li>
                    <u>Only on Netflix</u>
                </li>
             </ul>
             </Col>

             <Col>
             <ul>
                <li>
                    <u>Gift Card Terms</u>
                </li>
                <li>
                    <u>Media Centre</u>
                </li>
                <li>
                    <u>Ways to Watch</u>
                </li>
                <li>
                    <u>Cookie Preference</u>
                </li>
                <li>
                    <u>Speed Test</u>
                </li>
             </ul>
             </Col>

             <Col>
             <ul>
                <li>
                    <u>Help Centre </u>
                </li>
                <li>
                    <u>Investor Relation</u>
                </li>
                <li>
                    <u>Terms of Use</u>
                </li>
                <li>
                    <u>Corporate Information</u>
                </li>
                <li>
                    <u>Legal Notices</u>
                </li>
             </ul>
             </Col>
           
            </Row>
            
            <select className="btn" style={{backgroundColor:'gray',color:'white',marginTop:'5px'}}><option>English</option><option>Hindi</option></select>
            <Row>
            <p style={{marginBottom:'30px',color:'white',float:'right'}}>e-commerce India</p>
            </Row>
        </Container>




    </div>
}
export default HomeFooter