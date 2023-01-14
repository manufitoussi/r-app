import { Ref, useCallback, useRef, useState } from 'react';
import ActorContainer from './ActorContainer';
import ButtonActor from './button';

const ButtonActorContainer = (props: any) => {
  console.log('ButtonActorContainer');

  const elementDOMCallbackRef = useCallback((node: HTMLButtonElement) => {
    console.log('rendu', node);
    if (node !== null) {
      elementDOMRef.current = node as any;
      if (actor) {
        actor._elementDOM = node;
      }
    }
  }, []);

  const [properties, setProperties] = useState({});
  const elementDOMRef = useRef(null);
  const actorRef: Ref<ButtonActor> = useRef(new ButtonActor({ setup: props.setup, setProperties }));
  const actor = actorRef.current;
  const style = { color: actor?.properties.color };

  return (
    <ActorContainer>
      <button style={style} ref={elementDOMCallbackRef} onClick={() => {
        if (actor) {
          actor.properties.content = 'coucou';
        }
      }}>
        {actor?.properties.content}
      </button>
    </ActorContainer>
  );
};

export default ButtonActorContainer;