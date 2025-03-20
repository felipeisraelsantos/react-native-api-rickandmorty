import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Container, Texto } from "@/components/button/styles";

type Props = TouchableOpacityProps & {
  name: string;
};

export function Button({ name, ...rest }: Props) {
  return (
    <TouchableOpacity { ...rest }>
      <Container>
        <Texto>{name}</Texto>
      </Container>
    </TouchableOpacity>
  );
}
