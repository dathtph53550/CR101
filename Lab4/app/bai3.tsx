import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";

const Bai3 = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Hi Welcome Back! 👋</Text>
            <Text style={styles.subtitle}>Hello again you have been missed!</Text>

            <Image source={{
                uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUSEA8WFRUVFRUQFRAVFRAWFxYVFRYXFhYXFhYYHSggGBolHxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGy0mICUtLi8tLS0vLS0vLS0vLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKsBJgMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUDBAYCB//EAEkQAAEDAgIFBwgHBwIFBQAAAAEAAhEDBBIhBQYxQVETImFxkbHRFTJCUlSBkqEHFDNVdJPBFyM0cqOy0iSCQ1NiwuEWJURj8P/EABsBAQACAwEBAAAAAAAAAAAAAAADBAECBQYH/8QAOxEAAgECAwUFBgUEAgIDAAAAAAECAxEEITEFEhNBUSJSYXGRFDIzgaGxFSNTcsEG0eHwNEKy8VRzkv/aAAwDAQACEQMRAD8A+4oAgCAIAgIQBAEAQBAEAQBAEAQBAEAQBACYQGnVvPVHvKljT6leVbumH6y/1vkFvuRI+LPqZKd44bc/kVq6a5G0az5m5TqBwkKJprUsRkpK6PSwbBAEAQBAEAQBASgCAIAgCAIAgCAIAgCAIAgCAICCUAJhA3Y0q12fR7VLGn1K063JGu6o47Se1SKKInJvmeZWbIxdnptRw2OPasOKMqUlzMrLtw25rV00bqtJHqrXDxBkb+IWIwcWZlUU1ZkUHNaZxe4ApJN8hBxi73IuLjFkMh3rMYWMVKu9kjAtyIIAgMlCrhM9q1lG6N4S3WWYMquXUSgCAIAgCAIAgCAIAgCAIAgCAIAgIQBAEAQAlAYKly3c75St1B9CKVWPU16r2uMlzj0Qt4qS0RFKUZO7Zjq1i7LYBuW0Y2NJTby5GNbGgQBAEAQBAEAQBAEAQBAbNrcxk7ZuKjnC+aJ6dW2TNvlm+sO0KLdfQn349SRVafSHaEsxvR6npYNggCAIAgJQBAEAQBAEAQBAEAQBAEB4qPDRJWUrmJSSV2V1asXHPZwU8YpFOc3IxrY0CALICALACALICAIAgCAIAgCwAgCAIAgPTKhbsKw4pm0ZOOhv29xiyO1QyhYtU6m8Z1oSBAEAQBAEAQBAEAQBAEAQBAEBoXz5McO9TU1lcrVpZ2NZSEBzTdaKtRz/AKto6tWZTe6karXNALm7coPEdq6DwUIJcSootq9s+ZEpylfdi2evLt99z1/jZ4LX2ah+tH6m16ncZPl6++56/wAbPBPZqH60fqPzO4x5dvfuev8AGzwT2ah+tH6i9TuMjy7ffc9f42eCezUP1o/UXqdxjy7e/c9f42eCezUP1o/Ufmdxk+Xb37nr/GzwT2ah+tH0YvU7jI8u3v3PX+Nngns1D9aP1F6ncY8u3v3PX+Nngns1D9aP1F6ncY8u333PX+Nngns1D9aP1F6ncZPl2++56/xs8E9mofrR9GL1O4x5dvfuev8AGzwT2ah+tH6j8zuMjy7ffc9f42eCezUP1o/UXqdxk+Xb37nr/GzwT2ah+tH6i9TuMr73SGkDWZWbo+vTbTBxsJxNe2ZOQ2GN8HYtKlGlBK1RP+CpXhiOJGpGLstUYNO1b67FMs0bcU3MJc14c1wzjhHAZjpW7oUYptVov1MYvD1ayTjFpos7fT19hH/tVZ5AgvDmgFwycYjLMHJaww9GUU3VivDPIs03W3VvQd+Zk8u333PX+NngtvZqH60fRm96ncZY6B0u27pGo1jmFr3Un03RLXtiRI27QocTQdCe63fK6a5piE95XLJriDIVdq+RInZ3RaU3SAeKrNWZei7q56WDJKAIAgCAIAgCAIAgCAICEAQFfeNh/Xmp6byKlZWkYAtyIpvox/h7j8bX7mK1tb4sP2RN8D7j82dguWXSUBCAICUBCAIDy+oBtMLKTZhyS1PLbhp2OWXFo1VSL0ZkWpuSgIQBAc5rLpHSFKo0WlsKjIkuIJl0mRkRhyjtUkIwazZzcZXxUJpUYXXrn6mxo1l0WtdyQt5kvovcKrZ/6A2ME5HzoGfNJMrV2vkWqLqSinJbr5rU27dtdhdNNhBeXgNqHKQJyLBtdiO30lqSreXIzG6qezv6w6iR83hDN30OH1FrtDblpMF17XgHKcmZA7CegLs7Qd5Q/ZE5VF5y82b9teXLLw0awBpVA51J4AEYc8MjfHHPJUciKnOsq7jPR6HVWDuaRwKgqLM61F9mxsqMmJQBAEAQBAEAQBAEAQBAEBCA1b9uQPTCkpakFdZJmkFMVim+jH+HuPxtfuYrW1viw/ZE3wPuPzf8HYrll0ICEBKAICEBD3QCeCJXMN2Vzm9P6TNCi6rGJ0hrQdknZPQFeoUlOSiUKk3qyi1d1jq1qwpVQ04pwuaIggEweIgFW8RhowhvRIoTbdmdxZVSRB3bOpcqpG2ZeozbyZtKMnJQBAQgCAIDhdcNK6RtrgupyKPNLYY1zTkMQcY2zOUjLYrFOMHHPU4O0MRjKVa8fc5ZXXzNfUEB9vXLgCH3VR5EZHEym6IPX8lexlRVHBrlFL0ujfB1OJByfNl5Sa7lRTMkU/3oeTJhzXMa0naSOfnwa2cyqZZ52LmwOZHQo6qyLNB5s3VCWSUAQBAEAQBAEAQBAEAQEEwgNA30GTk1SunZFV4izu9DHWv6dSA09OYISmrMjliadTKLMYUpqU30Y/w9x+Nr9zFa2t8WH7Im+B9x+b/g7FcsukSgJQBAEAQGOu2WkdCzF2ZrNXi0clrNfUKdLBWaX49jBkcvSndBjNdHD05yleOVuZzptLJnO6vaQtKNWTTeCeaKjnNcGz0BojrzVyvTqzjqvIji4pn0WwbmT0QuPUeVi9QWbZvKEshAEAQBAEBCA+ealUnFly5joP12uIObSBgyLf1EHrGS7O0ElKFu5E5FFe9bqy3o3pLnuwiZFMQ4uaQyZIMDe5w/2rnXI54lReRYaNvZeARCxLNWJsLid6dmXigOqSgCAIAgCAIAgCAIAgCA81GyCOIhZTszEldWKHS1JzWidk/opt5PQ5GNhKMVfqVoMGR1oc9Ozui5pPDgCN635HWhJSSaKf6Mf4e4/G1+5itbW+LD9kSXA+4/N/wdLpatRZSdy9TAxwwF0lvnCMiM5XMim3kT1504wfEdk8is0bZOtGF7Ll9eiRjw1C1xa3aXU3jaAM8O+Ms9u0pX5EOHo8GPZk5Lxz+pOsunX2xpU6NLlKtZxDWZ+a2MRMdYHv6EhFPU1xmKlR3Y043ky9C0LwQBAEBzms2qwu3B7amB4GGCJaRJPWDntVzDYx0VZq6K1XDqbusiktfo/eXfva7Q3eGAkn3uyHzVqW0lbsx9SKOEfNnd0aYa0NGwZLlN3d2XYxUVZHtYMhAEAQBAEAQHzHVqs7k7mmyRiva5c/1W8wQD6x+W07gextJ9qn+yJ5+pOylHq2XbGhoAAgDIDgBsC5xWN+woekfd4rMUXcNSfvsvLOrIg7R3KKcbM69Kd1Y2FoSkoAgCAIAgCAIAgCAICEBTaWcajctjTI6eKmjGyOZjG6kcuRTBZOSNH6RZjwseHQec0Gd8LOaN6FdRlZPzPX0Y/wAPcfja/cxXNrfFh+yJ2cD7j83/AAdTfWdOsw06rA5p2tPf0HpXMTad0WatKFSLjNXRT2lsLWm+1puLp+xa4yRymLmk+q0guJ4Hty3d3ZFSpKjHhx+XzLaysxTEk4nkAOqGJMbAODeAHeSTrcnjFIy16oaJKw3Y2SuUNXTuJ0QQIyAOZ61z6W1aW/aSy6/4LdbZtVxvF59P8ld5duicLbQuMTzaw/UBdfDV8LiMoTz6NZnMxGHxFBXmsuqZ68sXvsD/AM1vgrnBpd9ehV4k+g8sXvsL/wA1vgnBpd9eg4k+g8sXvsL/AM1vgnApd9eg4k+g8sXvsD/zW+CcGl316DiT6Dyxe+wv/Nb4JwaXfXoOJPob+jL6vUxGrRdSiIl4di2zs2Rl2qKpTgvddzaM5HQUzIBPBU3qX4u6PawZPn30law6VoVaVDRtsXYmco+vgD88RaGCcmxEkn1hsVmhCk03UZq1N5RRn1C1wubp9S2vrc0rmg1rnwBhc1+TXCCYPQCRwO4a1qUY2lB3TMreTtJZnZ3tUsYS3aS1jZ2YnODQT0AmfcoA3ZHzbVEQ24BJMXdYSYk+bJyXX2jFKVO3cieaqe+/Mv2NxEDjkueYit5pFyFudcy2roeOnJazXZJKTtJFmq5cCAIAgCAIAgCAIAgCAwXj4b15LeCuyOq7RK5TlMp9O2x5M8mcLn8wdBMku9wBPuWGrZlHFUMm4mjorRtOgAGiTliedp8B0BYlJso0qcaehl+je7a2hcCHOJvK5Aa1ztzIk7G+8hXNqtOrC3cid7BSW4/NnTXF3VgnCKYjFnD3xvGEHC09Mu6lyZyUIuT5F2KlNpLK5X0dKUqZLm0nOe+MVRxbidA3kbBlsAAXNltWHKLL8dmyTzaLTRekeXxHBhiN8zM9HQrOExXHTytYhxGHdFrO9zbr0g8QVaaurFdOzuc1pPRPJNc5kuzmY2CIjJcXE4BUqTlC7d/odahjHUqKMslb6mzoO0bi830ZJOe2N66eGw8KKvFZ/Uix09+NpdS6Nuz1R81a35HL4ceh4wU/V71teRH+X0PYt2eqPmtd+RuqcHyH1dnq96b8jPDj0H1Znq96b8hw49CRbs9UJvMcOPQyrU3IQFTpq5pCAX88TzRJ2xtjZsClhQnNXSNqWJhSlaT1NbRBoF5dIxkAHKCQMwJ3gSk6NSC7SyMTxMK0uzyLq6pcoyAYOTmu2w5pDmmN4kDJRGrVz5rqk7m3OLL/AFdeYzz5uQ4rtY2LqTpq3/SJ51wcqkl4nYWlIBoMZkTntgrnbrTaZ0uFSg/y+nMg3jOW5EGXYTUI9UAgCekz8lJuPd3uQvnY37RsvHRmoZuyJaSvIslAXAgCAIAgCAIAgCAIAgNe9bLeoyt6bsyKsrxK2o2QQDEgiRu6VYTsyocDX07d06ga5weWl7S1zW9RJiMunpXWlhaMrOK1KbqS0ZLNKF/2ueexvmdTqZ84dZ6oUM9m5dmXqV9zobuomlqlvZ1XMtKlZpuqpJp4ebzaeRbt7AVHtWD40U8uyv5LuHrypUbqLlm9Dq7bSrbmi6oaL2QHNLX805CcuIz2ri4lKNOV88mdLA1+PaSTjnzKiq9h81kdOIn9F5ic6bXZjb53PTRjNPOV/kXGqux/+z/uXT2TpL5fyUNpax+ZbXl02kwucQAATJ4BdaUlFXZz4QlOSjFZs+faU0/WruMPc1m5oJGXF0b1yauJlN5OyPUYbZ1Kiu0ry/3Q8aL01VoHa5zf+XiIz3QTsUmExDjUSm+y9b8vEi2lgY1qTlBdpaW5+B1Lr6rJHJPgPazFiEFpEl+3YF6FU463Wh4iU5aZmOhfF+bSSJcCQ6QIWsJU533Xewr0K1FRdS6b5eBvU6jvWPaVhpCEpdT3yjvWPaVrZEm9LqOUd6x7Ss2Q3pdQKrvWPaVjdQ35dSzpmQD0Ku8mXYu6KnTmlMH7umecdrvVHR0q3hsPv9qWhXr1t3sx1OaXTKAQFhQurpoGHGQdnNxbfcqsqdBvkWFUqrqU2jb2yp8oeUAw1X4mAOJdVyLiR7wOGUblZrRrOyS5LPw5FeO7ds86V1vJEW7S2Zl7gJGfojZ0z0rSlg87zN3U6G1qTbOw1K75JecIJzJjNxnfn3LTGSV1BcjNNczuLWlhHSdvguTOV2dCnDdRmWpISgCAIAgCAIAgCAICo05rDQs4FUkucJDGiTHHgAt4U3LQp4rHUsNbf1fJGnozXO0ruDCXUychygAB6MQJA962lRlEgobVw9V7t7PxLC7pYM/R2zwW0JXJ6kN3PkcHrHYlrhX31RicPVPojqwwOsHiuxgKl4uL1/goVo2dyjg9A9//AIXRIjtPol/g6v4qp/ZTXG23/wAhftX8nS2f8J+bOzqUmu84Tu9y47Sasy+m07oodL2tNrThYBBEQuZjsPShRbjFJ5F7CVqkqiTZh0HpClRpvdUqNaDhAk7SASQOJUWzGoQk5ZLIsYyjOrJKmm9dCk09pOpeh3JNIo0wXOeZAcW7B4D3lTV6sqye57q1ZdwWGhhJJ1X25ZJdP96lG3YFSOqyUB0Frc17wMt2DCA0CpUEyQMpJ3dW9X41qtZKmslzZxamEw2Dk68ld37K8f8AefI6200TTpMDGgQN+89J6V0qbVOKjHQ87iFKvUdSbu2bTbVg3d624kjVUYLkT9WZ6vesb8jPDh0H1Znq96b8hw4dALdnq96b8upnhx6EXlfk6bn8BPv3LNOG/JRMzluxbOVbbF1N9V5k5kdcgEntXSdXdqRpxKCp3g5s0laICHbCsoHX6F+zb/KzuXDrfEl5s6tP3F5HxhgJq14H/wAit/cvVzXZh+1fY4q1l5s2qNEYhjJAnMiCY3wNkqJxlbIzvI7Oy1pt6Qa1tB+FoAaJZuXPns+pPNyRPDEQi9Cxpa8W586nUb0ww9xVeWy6q0aLKx0HqmXmjNJ0rlpdScSAYMtcIPDMKlVozpO00WKdSNRXibqiJAgCAIAgCAIAgCA5LXbVupdYa1HN7G4SwmMTZkYTuIk9qmpVN3JnH2ps+WItOnquXU+c16b2OLKjSHDItcCCO3MK2nc8tOEoPdkrM22aZum0jSZcOwFpbhJmBEQJ2e5aunG9yzTxteEdxSdjT5VznYyS4nPESST71LTk4NSRCqk41N7mbbTOxdmE1OO8jt05qcVJHZfRL/B1fxVT+ymuTtr48f2r+Tq7P+E/NnbrkF4o9Oea7rCo7R+A/NFvBfGXzNXV2ypVGu5Sk18FpAc0OAJBEgHequzIqUZKSvp/Jbx1WdOS3G1e+jsZNcYZaPDQAMLWgDICXgZBdDE5UWQbNvLFQb/3I4JmwLjnq3qSUMHf6WrNsbR9WhTaHHDGQiXECTG2JXpMHQhOahovA8Liq87OUndrqcGdab72l3w0v8V3fY6Hd+5y+PU6j/1Rfe0u+Gl/inslDu/f+449TqX+pmslxVuORrP5QODiHENBaWidwEjb8lTxuFpwhvxysT4etKUt2R3a5ReCAqNIaetGSx9QGZaWtBd1yRkFC8VTpvXMtw2fXqxuo5PrkUtC6aaL2tdLZhroInMEiDv3rp0q1OtUhUg9dUc6vha2HhKFSOls/M010jmniseaVmOphnYaF+zb/IzuXDrfEl5s61P3F5Hx+3P7y4/E1v7l65+5D9q+xwX70vNmwTC1BAd7+rxQyW2gNBVbt+XNpg86pu6m8Xd29VcVi40I9XyRNRoSqvwPpljaMo0206bYa0QB+p4lecqVJVJOUnmdiEFBWRsLQ2CAIAgCAIAgCAIAgOe1z0L9aoE02A1WQ5hykj0mz1buICkpT3Xmc7aeE49LsrtLT+x87tdXryo7C22eNxLmlgHvdAVp1IrmeYp4DETdlB/PL7mXS+rdazZjqVKefoBxxZ7xI53TCzTbm+yizW2XWhHNq5XUHkb5C6mHhKnq8ibDYWdLV/I7r6Jf4Or+Kqf2U1T218eP7V/J29n/AAn5nbLkF4pNOea7rCo7R+A/NFvBfGXzPOqux/8As/7lW2TpL5fyT7S1j8zBr0f9M7/Z/eFdxnwmNk/8qPk/scFQdI6lyT1MtTI5DU+qG3ZVohlRoc1zAC07xAXoKcnG0lqeHqxTk0yiOo1n/wDZ1Y//AArv4hW8PQq+y0yP/QtnxqfGPBZ/EK3h6D2WmWOh9Xre1JdSacREY3GTHAcFBWxNSqrSZJToxhoW6gJTltddKuptbRpzieJdG2CcLWjrM9nSqWMquNoR1Z2NlYWM26s9F/7v8jHojVGlhBuJe7eASGg8AB3rNPBwS7ebMYja9WUvysl9SNKauUqEVaLnNAMGkSXNzykTmCrmCw0YV1KPjl8ijjdo1KuGlTqZ3tn8yvXfPPGC4duW8FzNWdpoT7Nv8jO5cGt8SXmzr0/cXkfHaH2tx+IrbifSXr37kP2r7HBfvS82bTKBeQBLicg0CSeoQo3JRV2ZSbyR2Gr+p75bUucgMxRyJP8APuA6O5cnFbRVnGl6/wBi9Rwb1n6Ha0KLWNDWNDWjY0AAD3Ljyk5O7eZ0UklZGRYMhAEAQBAEAQBAEAQBAQgKPWjWFtmyBDqrhzGbgPWd0d/bFrC4Z1n4IgrVlTXifM7y4qVnmpWqEuO85nqA3DoyXchCMI7sUc2UnJ3ZqhoB5rSZ9Gd/ER3f/iaazRqNXtd69hTfSpUqb2uqvqy/HMkAbiMuaFcxGy6eKcakpNZJGlHGSopxS5lp+1a79no/1f8AJV/wCj339CX8Tn3UZtE68172vyNSjTaCC4luOeaJ3lcP+oNl08Pg5TjJvNa26nU2TjJVcQotcmbWltba2jsApU2P5QEnHiywREQR6xVD+ltnwxcark2rbunjctbdxUqMoWWt/wCCk0h9IVa6HJ1qVNrDEuZykggyNpXd2h/T96DVFty8bIpbK2vGniYyqqyz0z5GrT0vRBzft/6XeC8utiY16Qv81/c9lPbGDSznb5MzP0zQHpk9TXfqFvS2Hjaj3VFLzaIqu2cJSjvOX0ZvN+lO6aMLbeiQMgTykwMhPO2r2FP+n6Sit6TvZX0PCVdqSc5OKyuyf2rXfs9H+r/kt/wCj339DT8Tn3UP2rXfs9H+r/kn4BR77+g/E591D9q137PR/q/5J+AUe+/oPxOfdQ/atd+z0f6v+SfgFHvv6D8Tn3UerjTd1cgXbrb94yC2mGVcLgznNy2mSdy8jj6OGp7RhSVROPZu7rLPPwVvE9fs6tN7MqNq0mpWXXJWt5mxS1/0oBHk4flXPiu+sLsz/wCTH/8AcDzfFxn6L9GY73XnSNRhY/Rwg7DydyIO47VtGhs2n2o4mN/3QMN4up2XRfpI46hr3eAgOFN3ThcD8nKenBSkkK1KMIuSPdDXiuSJo0o3j95n78S3ow4klE0rUo04OR0dt9J9yxoDbajkAP8Ai7tnpKR7CpSd3N5+RAtoyWSiio0ZdF4qPIEvqvqEZxLoJA7VZxC4bjBckkV6fbvJ9TsNB6zUKEYrXDsl9MyT14s/muPiMNUqf9r+f+C5TnGDWR1lvrhYv/42E8HtePnEfNc2WCrLkXliKb5m/S03aPjDc0iTkByjJk9EqJ0Kq1i/QkVWD5osFEbhAEAQBAEAQBAEAQBAa9/dto0n1X+axpcfduHSdi2hBzkormaykoptnzSloq9v6jq+CMZnlHnC0DcG7yAMpAXbdajh4qF9OhzuHUqveLJmpGD7WsHEtMBoIAduJJ2x1BQvH73uoToOBqnVhrdr3jphqw8fPoilKc46o+d6Q0ZWp1XtNJ+TnQcLiCJMEEbQQvUUMTSnTjJSWnUqtXZrfVKsgCk+TsGB3gt54mlFXcl6ozGDk7I7nVjVn6u4Vqj5qQRgEYWgjYTvK+cbc/qH21OhSj2L6vV26dF9T2WzNk+zNVJvtdOSN3T+gmXbW88tcwENORGcecPcFR2LtqezZStFSjK1+uV9PUs7R2dHGRV3Zq9j55eaOrU6hpmm4uadjQXT0iNoX0+jjKGJoKtTkt19fs/E8VUw9ShVcJrNGGpTcTk0mMyACY61WoySbu+R0cY+zHzMmAuHNBPUCe5ZwrSndu2RjHu1O3ieHUHgSWOA3ktcB2rpKrB5Jr1OOYsQ4rcWYxDigsz0wTsz6s1htIWZtWFA8tTBYYL2Agg7MQlVsZUSw9Rp57svsyfDRvWgn1X3PrK+JI+kGKvctZ5x27ltGDlobwhKWhgNw1+bTIGXvUc007MlUHDJnyfRlGLt7ImGXTY6qdQL6HiKl6FOaerpv1lE8rGKU5p9JfZmjo+k55Aa0uMbACT2BdrCtRnduxzcZnSsuZaPtKrRzqTx1tcO8LrqtT5SXqjiyTjqXmgbepyZhjjziYAcciAN2zYVzcXWpueUl6lihaUci6oaIuahhlu8zxZHzOSpyr046yRYjTk8ki5sdR7p/wBq5lIe5zuxuXzVSptGmvdz+hYjhJPXI67QurNva85rcdT/AJr4JH8o2N92fSudWxVSrk8l0LlOhCGmpdKsTEoAgCAIAgCAIAgCAIDBd2rKoDajcTQQ7CdhIzEjeJgx0BbRm4u8TEoqWpo6ZvzShrciRJMTA2CAkY3KGNxLpWjHUonXzznLz8Q/uhS2scl4io87sn67VIiPiLf0lZube0VLWMOF290dDR+plYILMFoAy28SST2lUdpSaw8reB1di04yxkb8rv6Gxo+2DyS7dGSo7IowlvTlm0d7bEp9mCdovN25+Bs6SotwTABEAdRMQre1KMHRc+asQ7LqzjVUFo+RxmsgwvY5uRg5gkHIiO8q5/TM26VSD0TX1X+BtuKU4SWtmctoa45OtVJEy1zT8XFejr0uJFK+hysVDfhHzRt6m05dUJGxrR2kn9FW2g8oog2q+zFeLLjT7f8AS1RMjAcjnw3qDAf8mHmciF1JWPnvIt9VeysWN+RHIt9VLDfkW2rdMCqcIzwHvCrYqyhfxN4SbeZ1drbvxNOE+c3M9Y4rh4vEUlRmt5e6/syxQqR40M/+y+6OnXy0+hlRpppBDuIw9SsUppKxcwrT7J40bSIaSfSzChrSu7G9aV3bocRo+gRpeo0CTiuIA2nExxEdq9nUnvbNpP8A+v6NI8hXi1UrJdJ/ZmlqtLazyHFpaCARIIOLo2bF1q/uo83tebVGnbr/AAdLWfUcZc5zukku+ZVW1jzkpSlnJ3LDVnSYtq4c4nA4Fj4nYdhjfBA+axJXRawOIVGrd6PU+oaLe2pz2ODmxk4GQZ6VVqvKx6zDtT7UXkWShLgQBASgCAIAgCAIAgCAIAgIQGnpDR4qwZgjKduXAhbJ2KuJwqrWd7M1aWg2jznk9AEeKzvleGzYr3mYa2jmtMEe+SpVZo0nhIRdrGIWLOntHgs7qI/ZYeJ7daswloETlO9R1qMatNwfMtYdqhNTgtCrIfSdw3TuIXl/z8FU6fZnqPyMZT6/dCpWfVIG3g0BZqYmvi2o6+CFOhQwqctPFmWtoGjVA5VsuHpBzhE7ssl6XZsJ4Slup5vNnn8dWWIqb3JaHFaM0FSOkLqk/E1jWuNMyBJlpAkjnZH5LsTxijTj2ld6r/BrKhOVNPddvJnLWWkKtrDg2J24g4A9C6VKjQxacd5Pyab8yntKlUVlKDt1s9TYvNaX1abqZZTAcMMgme9S0Nk06VSM1J5eRyFTaKPlG+sO0LrGd19ByjfWHaEM7r6G5ovSf1d5e3CZGGC4jeDuPQquLwscRBQk7Z3NXBsuLbWsl7cVOkBibLpOQkSdq5OI2LDgz3ZNvddllnkSYeklWg3ya+53rq43Zr5NvWPqCg2aV1S5QQTvnJIz3Xcng9zQ9UmBoAG7JYbu7iTbdzlNFUD5fBAJBOLEAY+zbOfXK9hGM3sukmnfej/5HnKs4e01HdaP/wATBqzoKrWuLsNLWltZzQ15LS4cpUzbIzAgdoXarN7scjy+08PKvGCg1kdjT1Ifh51wA7gGEjtkH5KrvlCOyJWzln5FDpXRlS3fhqiJ814ktd1Hj8+hbppnOr4adGVpepvapaVq29yxjDLKj2sdT2g4jEgbiOPQo6sE43Za2bialKtGMdG80fWlSPZBASgCAIAgCAIAgCAIAgCAhAEAQEOYDkRKJ2MNJ6mu+zG4kfNSKoyF0FyMZsjxHzW3FRrwH1PLrJ3QjnGSs0Y4UlmmYhbkbI9xakd2Oit8jEozlq7/ADPLmEbQVummRuLWpidbsJksaTxLWlYdODd2kbqtUSspP1Z5daUiINJhHAsaR3JGEYu8VZ+AlWqSVpSbXi2YvJlv7PS/Lp+Cm41TvP1ZFZDyZb+z0vy6fgs8ap3n6sWQ8mW/s9L8un4LHGqd5+rFkPJlv7PS/Lp+Ccap3n6sWQ8mW/s9L8un4JxqnefqxZGZtuwCAxoAyADWwAoJUoSd3FN+RKqtRKyk/Vk8iz1G9gWOBS7q9EZ49XvP1YNBnqN7Aio01mor0Rh1qj1k/VkU7em0y2m0HiGtB7QFM5SerIrIj6rTmeTZMzOFszxmNqb0raixtU6DnbveVG5pEkacpGybCm5pbUYHg7Q4AjsKic2yfgQcbSV/Mx2mh7ak7FToMa71g0T7juWHJvVmtPC0ab3oRSZvLUsBAEBKAIAgCAIAgCAIAgCAhASgIQBAEAQEPaCIKLIw1dWNZ9kNx7VIqr5kLoLkY20qjTln78ls5RZqoVI6Gy63adrezJRqTRM6cXyMLrIbndq3VUjdBcmeDZO4j5rPERpwJEfU39Has8RGODIkWTuI+axxEZ4Ej0LLi75LHF8DZUOrMjbNvElY4jNlRiS+ixokt2dawpSbsZcIRV7Gt9ZG5gUm4+pFxVyRt0TiGbI7FFLJ6k0O0s0ZMA4DsCxdm+6ugDRwWBZEoZCAIAgCAICUAQBAEAQBAEAQBAEBCAIAgCAlAQgCAIAgJQEIAgCAIAgCAFAQAOCGLEoZJQEIAgJQEIAgCAICUAQBAEAQH//Z'
                }} style={{width: 300, height: 200,alignItems: 'center',justifyContent:'center'}} />

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                placeholder="Enter your email address"
                style={styles.input}
                keyboardType="email-address"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Enter your password"
                    style={styles.inputPassword}
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                >
                    <Text style={styles.toggleText}>{passwordVisible ? "👁️" : "🙈"}</Text>
                </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.orLoginText}>Or Login with</Text>
            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButtonGoogle}>
                <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.registerText}>
                Don’t have an account? <Text style={styles.registerLink}>Register</Text>
            </Text>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin:10,
  },
  title: {
    marginTop: 250,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "white",
    width: "100%",
  },
  inputPassword: {
    borderWidth: 1.5,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "white",
    width: "90%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    justifyContent: "space-between",
  },
  toggleText: {
    fontSize: 18,
    marginRight: 5,
  },
  orLoginText: {
    textAlign: "center",
    marginVertical: 15,
    color: "gray",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialButton: {
    backgroundColor: "#1877F2",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  socialButtonGoogle: {
    backgroundColor: "#DB4437",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  socialText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
  registerLink: {
    color: "purple",
    fontWeight: "bold",
  },
});

export default Bai3;