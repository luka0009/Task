import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CardComponent({ image_url, index, link, description }) {
  const [show, setShow] = useState(false);
  if(description == null) {
    description = 'There is no specific description for this NFT'
  }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image_url} style={{height: '300px', width: '800px'}} />
      <Card.Body>
        <Card.Title className="text-center mt-3">{`NFT N${index}`}</Card.Title>
        <Card.Text className="mt-4">
           Description: {show ? description : description?.split(' ').slice(0, 4).join(' ')}
          {show ? <span onClick={() => setShow(false)} className="cursor-pointer ml-4 underline">See less</span> : <span onClick={() => setShow(true)} className="cursor-pointer ml-4 underline">See more</span>}
          <br />
          <br />
        </Card.Text>
        <Button variant="primary" href={link} className='text-white bg-blue-700 px-3 py-1 rounded-md'>
          Go to Opensea
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
