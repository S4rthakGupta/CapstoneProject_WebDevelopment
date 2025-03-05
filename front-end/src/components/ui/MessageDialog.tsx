import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MessageDialogProps {
  recipientId: string;
}

export function MessageDialog({ recipientId }: MessageDialogProps) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ sender: 'USER_ID', recipient: recipientId, content: message }),
      headers: { 'Content-Type': 'application/json' },
    });
    setMessage('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Send Message</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Message</DialogTitle>
        </DialogHeader>
        <Textarea 
          placeholder="Write your message here..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <Button onClick={sendMessage}>Send</Button>
      </DialogContent>
    </Dialog>
  );
}
