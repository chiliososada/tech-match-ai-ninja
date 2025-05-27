-- 提案テーブル
CREATE TABLE public.proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- 提案ID
    match_id UUID NOT NULL REFERENCES public.project_engineer_matches(id), -- 関連マッチングID
    proposal_type TEXT NOT NULL CHECK (proposal_type IN ('project_proposal_to_engineer', 'engineer_recommendation_to_company')), -- 提案タイプ (技術者への案件提案, 企業への技術者推薦)
    recipient_email TEXT NOT NULL, -- 送信先メールアドレス
    recipient_user_id UUID REFERENCES public.profiles(id), -- 受信者ユーザーID (システム内のユーザーの場合)
    recipient_engineer_id UUID REFERENCES public.engineers(id), -- 受信者技術者ID (システム内の技術者の場合)
    subject TEXT NOT NULL, -- 送信メール件名
    body_template_used TEXT, -- 使用されたメールテンプレートID
    body_ai_summary TEXT, -- AIによる自動要約内容
    body_final_content TEXT NOT NULL, -- (編集後の)最終メール本文
    sent_at TIMESTAMPTZ, -- 送信日時
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sending', 'sent_successfully', 'failed_to_send', 'opened', 'clicked', 'replied', 'archived')), -- 送信ステータス
    created_by_user_id UUID NOT NULL REFERENCES public.profiles(id), -- 作成ユーザーID
    created_at TIMESTAMPTZ DEFAULT now(), -- 作成日時
    updated_at TIMESTAMPTZ DEFAULT now() -- 更新日時
);

-- コメント追加
COMMENT ON TABLE public.proposals IS '提案テーブル';
COMMENT ON COLUMN public.proposals.id IS '提案ID';
COMMENT ON COLUMN public.proposals.match_id IS '関連マッチングID';
COMMENT ON COLUMN public.proposals.proposal_type IS '提案タイプ (技術者への案件提案, 企業への技術者推薦)';
COMMENT ON COLUMN public.proposals.recipient_email IS '送信先メールアドレス';
COMMENT ON COLUMN public.proposals.recipient_user_id IS '受信者ユーザーID (システム内のユーザーの場合)';
COMMENT ON COLUMN public.proposals.recipient_engineer_id IS '受信者技術者ID (システム内の技術者の場合)';
COMMENT ON COLUMN public.proposals.subject IS '送信メール件名';
COMMENT ON COLUMN public.proposals.body_template_used IS '使用されたメールテンプレートID';
COMMENT ON COLUMN public.proposals.body_ai_summary IS 'AIによる自動要約内容';
COMMENT ON COLUMN public.proposals.body_final_content IS '(編集後の)最終メール本文';
COMMENT ON COLUMN public.proposals.sent_at IS '送信日時';
COMMENT ON COLUMN public.proposals.status IS '送信ステータス';
COMMENT ON COLUMN public.proposals.created_by_user_id IS '作成ユーザーID';
COMMENT ON COLUMN public.proposals.created_at IS '作成日時';
COMMENT ON COLUMN public.proposals.updated_at IS '更新日時';

-- インデックス作成
CREATE INDEX idx_proposals_match_id ON public.proposals(match_id);
CREATE INDEX idx_proposals_proposal_type ON public.proposals(proposal_type);
CREATE INDEX idx_proposals_recipient_email ON public.proposals(recipient_email);
CREATE INDEX idx_proposals_recipient_user_id ON public.proposals(recipient_user_id);
CREATE INDEX idx_proposals_recipient_engineer_id ON public.proposals(recipient_engineer_id);
CREATE INDEX idx_proposals_status ON public.proposals(status);
CREATE INDEX idx_proposals_created_by_user_id ON public.proposals(created_by_user_id);

-- updated_at トリガー (既に trigger_set_timestamp() 関数が定義されていると仮定)
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.proposals
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
