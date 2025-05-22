
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { EnhancedMatchingResult } from './types';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

interface SendMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  matchData: EnhancedMatchingResult | null;
}

export const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  isOpen,
  onClose,
  matchData,
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  if (!matchData) return null;

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      toast("エラー", {
        description: "件名とメッセージを入力してください",
        style: { backgroundColor: 'hsl(var(--destructive))' },
      });
      return;
    }

    setSending(true);
    
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      toast("送信完了", {
        description: "メッセージが正常に送信されました",
      });
      onClose();
    }, 1000);
  };

  const recipientCompany = matchData.caseCompany || '未設定';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="japanese-text">
            メッセージ送信
          </DialogTitle>
          <DialogDescription className="japanese-text">
            {recipientCompany}に{matchData.caseName}について連絡します
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="subject" className="text-sm font-medium japanese-text">件名</label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="件名を入力してください"
              className="japanese-text"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="text-sm font-medium japanese-text">メッセージ</label>
            <Textarea 
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="メッセージを入力してください"
              className="japanese-text min-h-[150px]"
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="japanese-text"
          >
            キャンセル
          </Button>
          <Button 
            type="button" 
            onClick={handleSend}
            disabled={sending}
            className="japanese-text"
          >
            {sending ? (
              <>処理中...</>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                送信する
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
