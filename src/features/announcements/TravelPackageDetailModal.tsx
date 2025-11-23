import React from 'react';
import { X } from 'lucide-react';
import { TravelPackage } from '../../types';

interface TravelPackageDetailModalProps {
    pkg: TravelPackage;
    onClose: () => void;
}

export const TravelPackageDetailModal: React.FC<TravelPackageDetailModalProps> = ({ pkg, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-2xl w-full max-w-sm border border-slate-700 text-white flex flex-col max-h-[90vh]">
            <div className="relative">
                <img src={pkg.imageUrl} alt={pkg.destination} className="w-full h-40 object-cover rounded-t-2xl" />
                <button onClick={onClose} className="absolute top-3 right-3 p-1 text-white bg-black/50 rounded-full hover:bg-black/80"><X size={20} /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-4">
                <h2 className="text-xl font-bold">{pkg.destination}</h2>
                <p className="text-sm text-slate-400">{pkg.description}</p>
                <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                    <p className="font-bold text-lg text-blue-400">{pkg.price}</p>
                    <div className="text-right">
                        <p className="font-semibold">{pkg.currentApplicants} / {pkg.maxApplicants}명</p>
                        <p className="text-xs text-slate-400">신청 현황</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-blue-400 mb-2">커리큘럼</h3>
                    <div className="space-y-1">
                        {pkg.details.curriculum.map((c, i) => <p key={i} className="text-sm bg-slate-700/20 p-2 rounded-md">{c}</p>)}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-blue-400 mb-2">참고 사항</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {pkg.details.notes.map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                </div>
            </div>
            <div className="p-4 flex-shrink-0">
                <button disabled={pkg.isConfirmed} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
                    {pkg.isConfirmed ? '모집 마감' : '참가 신청'}
                </button>
            </div>
        </div>
    </div>
);
