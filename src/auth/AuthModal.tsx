import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Avatar, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import Login from "./Login"
import Register from "./Register"
import { auth } from '../config/FireBase';
import { useAuthState } from 'react-firebase-hooks/auth'

export function AuthModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user] = useAuthState(auth);
    return (
      <>
        <Button 
        onClick={onOpen}
        display={user? 'none': 'block'}
         >{user?'LogOut':'Login/SignUp'}</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Welcome to Hot Blog</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Tabs isFitted  >
                <TabList>
                    <Tab >SignUp </Tab>
                    <Tab>Login</Tab> 
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Register />
                    </TabPanel>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                </TabPanels>
                </Tabs>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }