import { useEffect } from 'react';
import './ActorContainer.css';
import PrototypedBase from '../prototyped/base';

function ActorContainer(props: any) {
  console.log('ActorContainer');
  useEffect(() => {
    console.log('init ActorContainer');
  }, []);
  return props.children;
}

export default ActorContainer;


